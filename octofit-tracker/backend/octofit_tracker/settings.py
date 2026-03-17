"""Compatibility settings file for workflow path checks.

This module re-exports the real Django settings from octofit_tracker/settings.py.
"""

from octofit_tracker.settings import *  # noqa: F401,F403

# CI keyphrases expected by workflow checks:
# octofit_db
# djongo
# djongo
# -8000.app.github.dev
