class Image < Attachment
  self.inheritance_column = :type

  mount_uploader :image, ImageUploader
end
