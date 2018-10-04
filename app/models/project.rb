class Project < Card
  self.inheritance_column = :type
  has_many :tasks
  has_many :board_in_projects
  has_many :boards, through: :board_in_projects

  accepts_nested_attributes_for :board_in_projects
end
