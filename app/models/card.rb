class Card < ApplicationRecord
  # after_create :check_where_created
  after_create :attach_to_user
  # after_create :create_card_in_column

  has_many :card_in_columns, :dependent => :delete_all
  has_many :columns, through: :card_in_columns
  belongs_to :user

  accepts_nested_attributes_for :card_in_columns

  def self.types
    %w(Task Project)
  end

  def check_where_created
    put_in_inbox
  end

  # def create_card_in_column
  #   @user = User.current
  #   @general_board = @user.boards.find_by(general: true)
  #   @inbox = @general_board.columns.find_by(name: 'Inbox')
  #   card_in_column = self.card_in_columns.create(card_id: self.id, user_id: @user.id, column_id: @inbox.id)
  #   card_in_column.save!
  # end

  # def put_in_inbox
  #   @inbox = Column.find_by(name: 'Inbox')
  #   card_in_column = self.card_in_columns.create(card_id: self.id, column_id: @inbox.id)
  #   card_in_column.save!
  # end

  def attach_to_user
    self.user_id = User.current.id
  end
end
