from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.conf import settings
from meta.views import Meta # from django-meta
from flayyer import Flayyer, FlayyerMeta

from .models import Choice, Question

class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'
    # context_object_name = 'object' # defaults to `object`

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        question = context['object'] # see 'context_object_name'
        flayyer = Flayyer(**{
            **settings.FLAYYER_DEFAULT,
            'template': 'item',
            'variables': {
                'title': question.question_text,
            },
            'meta': FlayyerMeta(id=question.id),
        })
        context['meta'] = Meta(
            title=f'Question: #{question.id}',
            description=question.question_text,
            image=flayyer.href(),
        )
        return context


def index(request: HttpRequest):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    meta = Meta() # use defaults from settings.py
    context = {'latest_question_list': latest_question_list, 'meta': meta}
    return render(request, 'polls/index.html', context)

def results(request: HttpRequest, question_id):
    question = get_object_or_404(Question, pk=question_id)
    meta = Meta()
    # meta = Meta(image=str(Flayyer(...)))
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
