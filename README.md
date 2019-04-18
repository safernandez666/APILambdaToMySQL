# API Lambda To MySQL Node.js

# EndPoints

  findAll:
    handler: crud/usuarios.findAll
    events:
      - http:
          path: usuarios
          method: get
  findOne:
      handler: crud/usuarios.findOne
      events:
        - http:
            path: usuarios/{usuario}
            method: get
  create:
      handler: crud/usuarios.create
      events:
        - http:
            path: usuarios
            method: post
  update:
    handler: crud/usuarios.update
    events:
      - http:
          path: usuarios/{usuario}
          method: put
  delete:
    handler: crud/usuarios.delete
    events:
      - http:
          path: usuarios/{usuario}
          method: delete
