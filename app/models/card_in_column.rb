class CardInColumn < ApplicationRecord
  # belongs_to :card
  # belongs_to :user

  belongs_to :column
  belongs_to :columnable, polymorphic: true
end
