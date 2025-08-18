#!/bin/bash

# Remove all S3 buckets that start with "split"
for bucket in $(aws s3api list-buckets --query "Buckets[?starts_with(Name, 'split')].Name" --output text); do
  echo "Removing bucket: $bucket"
  aws s3 rm "s3://$bucket" --recursive
  aws s3api delete-bucket --bucket "$bucket"
done

# Remove all CodePipelines that start with "split"
for pipeline in $(aws codepipeline list-pipelines --query "pipelines[?starts_with(name, 'split')].name" --output text); do
  echo "Removing pipeline: $pipeline"
  aws codepipeline delete-pipeline --name "$pipeline"
done

# Remove all CodeBuild projects that start with "split"
for project in $(aws codebuild list-projects --query "projects[?starts_with(@, 'split')]" --output text); do
  echo "Removing CodeBuild project: $project"
  aws codebuild delete-project --name "$project"
done

# Remove all Amplify apps that start with "split"
for app in $(aws amplify list-apps --query "apps[?starts_with(name, 'split')].appId" --output text); do
  echo "Removing Amplify app: $app"
  aws amplify delete-app --app-id "$app"
done

# Remove all IAM roles that start with "split"
for role in $(aws iam list-roles --query "Roles[?starts_with(RoleName, 'split')].RoleName" --output text); do
  echo "Removing IAM role: $role"
  # Detach all policies first
  for policy in $(aws iam list-attached-role-policies --role-name "$role" --query "AttachedPolicies[].PolicyArn" --output text); do
    aws iam detach-role-policy --role-name "$role" --policy-arn "$policy"
  done
  # Delete inline policies
  for policy in $(aws iam list-role-policies --role-name "$role" --query "PolicyNames[]" --output text); do
    aws iam delete-role-policy --role-name "$role" --policy-name "$policy"
  done
  aws iam delete-role --role-name "$role"
done