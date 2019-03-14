json.extract! checklistitem, :id, :name, :checklist_id, :created_at, :updated_at
json.url checklistitem_url(checklistitem, format: :json)
