from django.urls import path
from .views import AttendanceCreateView, AttendanceListByEmployeeView

urlpatterns = [
    path('attendance/', AttendanceCreateView.as_view()),
    path('attendance/<int:employee_id>/', AttendanceListByEmployeeView.as_view()),
]
