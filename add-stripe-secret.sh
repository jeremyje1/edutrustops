#!/bin/bash

echo "To add the STRIPE_SECRET_KEY manually, run the following commands:"
echo ""
echo "# For production environment:"
echo "vercel env add STRIPE_SECRET_KEY production"
echo ""
echo "# For preview environment:"
echo "vercel env add STRIPE_SECRET_KEY preview"
echo ""
echo "# For development environment:"
echo "vercel env add STRIPE_SECRET_KEY development"
echo ""
echo "When prompted, paste your Stripe secret key from your .env file"
