class Card < ApplicationRecord
  # after_create :attach_to_user

  # has_many :card_in_columns
  # has_many :columns, through: :card_in_columns
  belongs_to :user

  # def attach_to_user
    # self.user_id = User.current.id
  # end
end
