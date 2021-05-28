from django.http import HttpRequest, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.conf import settings
from meta.views import Meta  # [Required]
from flayyer import FlayyerAI  # [Required]
from .models import Choice, Question


# FlayyerAI smart image link helper
def flayyer_href(current_pathname):
    flayyer = FlayyerAI(**{
        **settings.FLAYYER_DEFAULT,
        # Set current pathname to enrich your preview with our AI system
        'path': current_pathname,
    })
    return flayyer.href()


# Class View example
class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'

    # [Required] Provide a meta=Meta() on the context
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        question = context['object']  # see 'context_object_name'
        context['meta'] = Meta(
            title=f'Question: #{question.id}',
            description=question.question_text,
            # [Required]
            image=flayyer_href(self.request.get_full_path()),
            # [Recommended] Keep your original og:image handy for your project
            # extra_props={
            #     'flayyer:default': question.image, # only illustrative (fails)
            # }
        )
        return context


# Function view example
def index(request: HttpRequest):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    meta = Meta(image=flayyer_href(request.get_full_path()))  # [Required]
    context = {'latest_question_list': latest_question_list, 'meta': meta}
    return render(request, 'polls/index.html', context)


# Another function view example
def results(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    meta = Meta(image=flayyer_href(request.get_full_path()))  # [Required]
    return render(request, 'polls/results.html', {'question': question, 'meta': meta})


def vote(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
