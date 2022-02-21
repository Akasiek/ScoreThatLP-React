from rest_framework.pagination import PageNumberPagination


class TwentyFivePagesPagination(PageNumberPagination):
    page_size = 25


class TenPagesPagination(PageNumberPagination):
    page_size = 10


class FivePagesPagination(PageNumberPagination):
    page_size = 5
