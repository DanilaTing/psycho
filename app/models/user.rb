class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  after_create :create_general_board, :create_priorities_board

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :boards
  has_many :tasks
  has_many :projects
  has_many :trello_imports

  def create_general_board
    board = self.boards.create(name: 'General', general: true)
    board.save!
  end

  def create_priorities_board
    board = self.boards.create(name: 'Priorities')
    board.save!
  end
end
