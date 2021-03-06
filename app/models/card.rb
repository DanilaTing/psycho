class Card < ApplicationRecord
  after_create :attach_to_user

  has_many :card_in_columns, :dependent => :delete_all
  has_many :columns, through: :card_in_columns
  belongs_to :user

  accepts_nested_attributes_for :card_in_columns

  def self.types
    %w(Task Project)
  end

  def attach_to_user
    self.user_id = User.current.id
  end
end
