from django.test import TestCase
from rest_framework.test import APIRequestFactory

from .models import Activity, Leaderboard, Team, User, Workout
from .urls import api_root


class CollectionModelMetaTests(TestCase):
    def test_db_table_names(self):
        self.assertEqual(User._meta.db_table, 'users')
        self.assertEqual(Team._meta.db_table, 'teams')
        self.assertEqual(Activity._meta.db_table, 'activities')
        self.assertEqual(Leaderboard._meta.db_table, 'leaderboard')
        self.assertEqual(Workout._meta.db_table, 'workouts')


class ApiRootTests(TestCase):
    def test_api_root_exposes_all_collections(self):
        factory = APIRequestFactory()
        request = factory.get('/api/')
        response = api_root(request)

        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
