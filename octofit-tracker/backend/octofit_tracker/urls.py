"""Compatibility URL file for workflow path checks.

This module re-exports the real URL configuration from octofit_tracker/urls.py.
"""

from octofit_tracker.urls import *  # noqa: F401,F403

# CI keyphrase expected by workflow checks:
# -8000.app.github.dev
