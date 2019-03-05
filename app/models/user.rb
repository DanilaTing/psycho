class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  after_create :create_general_board
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :boards

  def create_general_board
    board = self.boards.create(name: 'General', general: true)
    board.save!
  end
end
