class Column < ApplicationRecord
  has_many :card_in_columns
  has_many :cards, through: :card_in_columns

  accepts_nested_attributes_for :card_in_columns

  belongs_to :board
end
