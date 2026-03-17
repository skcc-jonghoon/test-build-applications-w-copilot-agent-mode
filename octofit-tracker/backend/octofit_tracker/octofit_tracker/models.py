from django.db import models


class User(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    hero_name = models.CharField(max_length=120)
    team = models.CharField(max_length=50)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.hero_name


class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    city = models.CharField(max_length=120)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user_email = models.EmailField()
    activity_type = models.CharField(max_length=80)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user_email} - {self.activity_type}"


class Leaderboard(models.Model):
    user_email = models.EmailField()
    points = models.PositiveIntegerField()
    rank = models.PositiveIntegerField()

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.user_email} - #{self.rank}"


class Workout(models.Model):
    user_email = models.EmailField()
    title = models.CharField(max_length=120)
    target = models.CharField(max_length=120)
    intensity = models.CharField(max_length=30)

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return f"{self.user_email} - {self.title}"
