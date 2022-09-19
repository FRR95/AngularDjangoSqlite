from EmployeeApp import views

from django.urls import  re_path
from django.conf.urls.static import static
from django.conf import settings
from .views import *







urlpatterns=[
re_path(r'^department/$',views.departmentApi),
re_path (r'^department/([0-9]+)$',views.departmentApi),

re_path(r'^employee/$',views.employeeApi),
re_path(r'^employee/([0-9]+)$',views.employeeApi),

re_path(r'^Employee/SaveFile/$',views.CSVApi),
re_path(r'^Employee/SaveFile/([0-9]+)$',views.CSVApi),

re_path(r'^Image/SaveFile/$',views.post),
re_path(r'^Image/SaveFile/([0-9]+)$',views.post),





]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 
