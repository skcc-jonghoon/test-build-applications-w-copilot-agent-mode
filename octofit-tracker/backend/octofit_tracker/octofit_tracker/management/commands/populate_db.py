from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = 'octofit_db 데이터베이스에 테스트 데이터를 입력합니다.'

    def handle(self, *args, **options):
        Team.objects.all().delete()
        User.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        Team.objects.bulk_create(
            [
                Team(name='marvel 팀', city='New York'),
                Team(name='dc 팀', city='Gotham'),
            ]
        )

        users = [
            User(name='Peter Parker', email='spiderman@octofit.dev', hero_name='Spider-Man', team='marvel 팀'),
            User(name='Tony Stark', email='ironman@octofit.dev', hero_name='Iron Man', team='marvel 팀'),
            User(name='Bruce Wayne', email='batman@octofit.dev', hero_name='Batman', team='dc 팀'),
            User(name='Diana Prince', email='wonderwoman@octofit.dev', hero_name='Wonder Woman', team='dc 팀'),
        ]
        User.objects.bulk_create(users)

        Activity.objects.bulk_create(
            [
                Activity(
                    user_email='spiderman@octofit.dev',
                    activity_type='HIIT Swing Session',
                    duration_minutes=45,
                    calories_burned=520,
                ),
                Activity(
                    user_email='ironman@octofit.dev',
                    activity_type='Power Lift Circuit',
                    duration_minutes=60,
                    calories_burned=640,
                ),
                Activity(
                    user_email='batman@octofit.dev',
                    activity_type='Night Run',
                    duration_minutes=50,
                    calories_burned=500,
                ),
                Activity(
                    user_email='wonderwoman@octofit.dev',
                    activity_type='Combat Conditioning',
                    duration_minutes=55,
                    calories_burned=610,
                ),
            ]
        )

        Leaderboard.objects.bulk_create(
            [
                Leaderboard(user_email='ironman@octofit.dev', points=920, rank=1),
                Leaderboard(user_email='wonderwoman@octofit.dev', points=890, rank=2),
                Leaderboard(user_email='batman@octofit.dev', points=860, rank=3),
                Leaderboard(user_email='spiderman@octofit.dev', points=840, rank=4),
            ]
        )

        Workout.objects.bulk_create(
            [
                Workout(
                    user_email='spiderman@octofit.dev',
                    title='Web Core Blast',
                    target='Core + Agility',
                    intensity='High',
                ),
                Workout(
                    user_email='ironman@octofit.dev',
                    title='Arc Reactor Strength',
                    target='Full Body',
                    intensity='Medium',
                ),
                Workout(
                    user_email='batman@octofit.dev',
                    title='Bat Endurance',
                    target='Stamina',
                    intensity='High',
                ),
                Workout(
                    user_email='wonderwoman@octofit.dev',
                    title='Amazon Power Flow',
                    target='Strength + Mobility',
                    intensity='Medium',
                ),
            ]
        )

        self.stdout.write(self.style.SUCCESS('octofit_db 테스트 데이터 적재 완료'))
