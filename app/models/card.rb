class Card < ApplicationRecord
  after_create :check_where_created

  has_many :card_in_columns
  has_many :columns, through: :card_in_columns

  accepts_nested_attributes_for :card_in_columns

  def self.types
    %w(Task Project)
  end

  def check_where_created
    put_in_inbox
  end

  def put_in_inbox
    card_in_column = self.card_in_columns.create(card_id: self.id, column_id: 6)
    card_in_column.save!
  end
end
