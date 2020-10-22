class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content, :comments
end
