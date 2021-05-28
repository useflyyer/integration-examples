from django.http.request import HttpRequest
from flayyer import FlayyerAI  # [Required]


# [Required] Provides FlayyerAI smart image link to views
def flayyer_href(request: HttpRequest):
    flayyer = FlayyerAI(
        project="your-project-slug",
        path=request.get_full_path(),  # pass current pathname dynamically
    )
    return {'flayyer_href': flayyer.href()}
