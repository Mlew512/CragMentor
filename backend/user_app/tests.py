import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crag_proj.settings")
import django
django.setup()

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
import json

User = get_user_model()

class SignUpTestCase(TestCase):
    user_1 = {
        "email": "test@example.com",
        "password": "password"
    }

    def setUp(self):
        self.client = APIClient()

    def test_successful_signup(self):
        data = json.dumps(self.user_1)
        response = self.client.post("/api/users/signup", data, content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue("token" in response.data)

    def test_duplicate_signup(self):
        # Create a user first
        User.objects.create_user(email="test@example.com", password="password")
        data = json.dumps(self.user_1)
        response = self.client.post("/api/users/signup", data, content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data, "User test@example.com already exists"
        )
