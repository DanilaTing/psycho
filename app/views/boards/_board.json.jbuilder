json.extract! board, :id, :name, :project_id, :position, :created_at, :updated_at
json.url board_url(board, format: :json)
