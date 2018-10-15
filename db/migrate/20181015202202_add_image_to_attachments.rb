class AddImageToAttachments < ActiveRecord::Migration[5.1]
  def change
    add_column :attachments, :image, :string
  end
end
