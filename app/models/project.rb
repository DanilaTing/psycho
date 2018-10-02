class Project < Card
  self.inheritance_column = :type
  has_many :tasks
end
