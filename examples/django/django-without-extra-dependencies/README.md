# example-django

This example has one required dependency: [`flayyer`](https://github.com/flayyer/flayyer-python)

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
