class Checklist < ApplicationRecord
  has_many :checklistitems
  accepts_nested_attributes_for :checklistitems

  def checklistitems_for_form
   collection = checklistitems.where(checklist_id: id)
   collection.any? ? collection : checklistitems.build
 end
end
