#!/bin/bash

# Read the .env.vercel-import file and add each variable to Vercel
while IFS='=' read -r key value; do
  # Skip empty lines and comments
  if [[ -z "$key" || "$key" =~ ^#.* || "$key" =~ ^[[:space:]]*# ]]; then
    continue
  fi
  
  # Remove any leading/trailing whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)
  
  # Skip if key is empty
  if [[ -z "$key" ]]; then
    continue
  fi
  
  echo "Adding $key..."
  
  # Add to all environments (production, preview, development)
  echo "$value" | vercel env add "$key" production
  echo "$value" | vercel env add "$key" preview
  echo "$value" | vercel env add "$key" development
  
done < .env.vercel-import

echo "Environment variables imported successfully!"
echo "Note: You'll need to manually add STRIPE_SECRET_KEY via the Vercel dashboard or CLI"
