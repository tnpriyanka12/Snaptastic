json.extract! comment, :id, :comment_string, :snap_id, :user_id, :created_at, :updated_at
json.url comment_url(comment, format: :json)
