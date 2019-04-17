class CardInColumn < ApplicationRecord
  belongs_to :column
  belongs_to :columnable, polymorphic: true
end
