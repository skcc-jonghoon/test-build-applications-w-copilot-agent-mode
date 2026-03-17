from rest_framework import serializers

from .models import Activity, Leaderboard, Team, User, Workout


class ObjectIdStringModelSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)


class UserSerializer(ObjectIdStringModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'hero_name', 'team']
        read_only_fields = ['id']


class TeamSerializer(ObjectIdStringModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'city']
        read_only_fields = ['id']


class ActivitySerializer(ObjectIdStringModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'user_email', 'activity_type', 'duration_minutes', 'calories_burned']
        read_only_fields = ['id']


class LeaderboardSerializer(ObjectIdStringModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_email', 'points', 'rank']
        read_only_fields = ['id']


class WorkoutSerializer(ObjectIdStringModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'user_email', 'title', 'target', 'intensity']
        read_only_fields = ['id']
