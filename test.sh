#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== 1. Registering Users (Admin & User) ===${NC}"
curl -s -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"username": "admin", "email": "admin@test.com", "password": "password123", "role": "ADMIN"}' > /dev/null
curl -s -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "email": "test@test.com", "password": "password123", "role": "USER"}' > /dev/null
echo "Users registered (or already exist)."

echo -e "\n${BLUE}=== 2. Getting Admin Token ===${NC}"
ADMIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "password123"}')
ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ADMIN_TOKEN" ]; then
    echo "Failed to get admin token. Exiting."
    exit 1
fi
echo "Admin Token acquired."

echo -e "\n${BLUE}=== 3. Getting User Token ===${NC}"
USER_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}')
USER_TOKEN=$(echo $USER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$USER_TOKEN" ]; then
    echo "Failed to get user token. Exiting."
    exit 1
fi
echo "User Token acquired."

echo -e "\n${BLUE}=== 4. User Follows Keanu Reeves ===${NC}"
curl -s -X POST http://localhost:8080/api/follow/follow \
-H "Authorization: Bearer $USER_TOKEN" \
-H "Content-Type: application/json" \
-d '{"actorName": "Keanu Reeves"}'
echo -e "\n"

echo -e "\n${BLUE}=== 5. Admin Adds Movie (Triggers Notification) ===${NC}"
curl -s -X POST http://localhost:8080/api/admin/movies \
-H "Authorization: Bearer $ADMIN_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title": "The Matrix Resurgence", "releaseYear": 2024, "type": "movie", "stars": ["Keanu Reeves", "Carrie-Anne Moss"]}'
echo -e "\n"

echo -e "\n${BLUE}=== 6. Fetching User Notifications ===${NC}"
NOTIFICATIONS=$(curl -s http://localhost:8080/api/notifications/ \
-H "Authorization: Bearer $USER_TOKEN")
echo $NOTIFICATIONS
echo -e "\n"

echo -e "\n${BLUE}=== 7. Fetching Unread Count ===${NC}"
curl -s http://localhost:8080/api/notifications/unread-count \
-H "Authorization: Bearer $USER_TOKEN"
echo -e "\n"

# Extract Notification ID for Mark as Read (Uses Python for JSON parsing to be safe)
NOTIF_ID=$(echo $NOTIFICATIONS | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['id'])" 2>/dev/null)

if [ ! -z "$NOTIF_ID" ]; then
    echo -e "\n${BLUE}=== 8. Marking Notification $NOTIF_ID as Read ===${NC}"
    curl -s -X PUT http://localhost:8080/api/notifications/$NOTIF_ID/read \
    -H "Authorization: Bearer $USER_TOKEN"
    echo -e "\n"
else
    echo -e "\nCould not extract Notification ID. Skipping step 8."
fi