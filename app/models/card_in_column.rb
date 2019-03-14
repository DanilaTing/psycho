class CardInColumn < ApplicationRecord
  belongs_to :column
  belongs_to :card
  belongs_to :user
end
