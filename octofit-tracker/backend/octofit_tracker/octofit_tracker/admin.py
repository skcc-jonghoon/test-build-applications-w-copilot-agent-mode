from django.contrib import admin

from .models import Activity, Leaderboard, Team, User, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'hero_name', 'team')
    search_fields = ('name', 'email', 'hero_name', 'team')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'city')
    search_fields = ('name', 'city')


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'activity_type', 'duration_minutes', 'calories_burned')
    search_fields = ('user_email', 'activity_type')


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'points', 'rank')
    search_fields = ('user_email',)
    ordering = ('rank', 'id')


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'title', 'target', 'intensity')
    search_fields = ('user_email', 'title', 'target', 'intensity')
