class Card < ApplicationRecord
  # after_create :attach_to_user

  belongs_to :user

  # def attach_to_user
    # self.user_id = User.current.id
  # end
end
