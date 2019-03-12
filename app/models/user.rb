class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  after_create :create_general_board
  after_create :create_priorities_board

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :boards
  has_many :cards
  has_many :card_in_columns

  def self.current
    Thread.current[:user]
  end

  def self.current=(user)
    Thread.current[:user] = user
  end

  def create_general_board
    board = self.boards.create(name: 'General', general: true)
    board.save!
  end

  def create_priorities_board
    board = self.boards.create(name: 'Priorities')
    board.save!
  end
end
