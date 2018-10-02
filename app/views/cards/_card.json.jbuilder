json.extract! card, :id, :name, :description, :type, :created_at, :updated_at
json.url card_url(card, format: :json)
