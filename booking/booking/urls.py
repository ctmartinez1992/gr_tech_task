from django.contrib import admin
from django.urls import path, include
from debug_toolbar.toolbar import debug_toolbar_urls
from flats.urls import router

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
] + debug_toolbar_urls()