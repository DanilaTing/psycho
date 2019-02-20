class Project < Card
  after_create :create_general_board

  self.inheritance_column = :type
  has_many :tasks
  has_many :board_in_projects
  has_many :boards, through: :board_in_projects

  accepts_nested_attributes_for :board_in_projects

  def create_general_board
    board = self.boards.create(name: 'General')
    board.save!
  end
end
