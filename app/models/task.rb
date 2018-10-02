class Task < Card
  self.inheritance_column = :type
  belongs_to :project, optional: true
end
