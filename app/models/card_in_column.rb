class CardInColumn < ApplicationRecord
  belongs_to :column
  belongs_to :card
end
