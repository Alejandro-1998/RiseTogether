#!/bin/bash
set -e

# Wait for database connection (simple wait, or use a proper wait-for-it script if needed)
# sleep 5

# Cache configuration, routes, and views if in production
if [ "$APP_ENV" = "production" ]; then
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

# Run migrations (careful in production!)
# php artisan migrate --force

# Start Supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
