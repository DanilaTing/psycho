class Task < Card
  belongs_to :project, optional: true

  has_many :card_in_columns, as: :columnable
  has_many :columns, through: :card_in_columns
end
