class Project < Card
  after_create :attach_general_board
  after_create :attach_priority_board

  self.inheritance_column = :type
  has_many :tasks
  has_many :board_in_projects
  has_many :boards, through: :board_in_projects

  accepts_nested_attributes_for :board_in_projects

  def attach_general_board
    @general_board = Board.find_by(name: 'General')
    board_in_project = self.board_in_projects.create(board_id: @general_board.id, project_id: self.id)
    board_in_project.save!
  end

  def attach_priority_board
    @priority_board = Board.find_by(name: 'Priorities')
    board_in_project = self.board_in_projects.create(board_id: @priority_board.id, project_id: self.id)
    board_in_project.save!
  end
end
