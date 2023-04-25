from django.shortcuts import redirect

class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.session.get('username') and request.path != '' and request.path != '/':
            return redirect('connex')

        response = self.get_response(request)
        return response

