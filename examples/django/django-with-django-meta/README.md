# example-django

This example uses `django-meta` to handle meta-tags.

You can further understand how to handle meta-tags with `django-meta` [here](https://django-meta.readthedocs.io/en/latest/installation.html).

**Tip: Look for `[Required]` with full search on your editor**

Prepare the local environment:

```bash
poetry install
```

```bash
poetry run python manage.py migrate
```

```bash
poetry shell
```

Run commands as:

```bash
poetry run python manage.py runserver
```

To create an admin user able to create `polls`:

```bash
poetry run python manage.py createsuperuser
```

Then you can login at `/admin`
