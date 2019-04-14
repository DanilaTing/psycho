class Project < Card
  has_many :tasks
  
  has_many :card_in_columns, as: :columnable
  has_many :columns, through: :card_in_columns
end
