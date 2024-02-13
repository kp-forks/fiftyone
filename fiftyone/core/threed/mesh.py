"""
| Copyright 2017-2024, Voxel51, Inc.
| `voxel51.com <https://voxel51.com/>`_
|
"""
from typing import Literal

from pydantic.dataclasses import dataclass

from .material_3d import Material3D
from .object_3d import Object3D


class Mesh(Object3D):
    pass


class ObjMesh(Mesh):
    def __init__(
        self, name: str, obj_path: str, mtl_path: str = None, **kwargs
    ):
        super().__init__(name=name, **kwargs)

        if not obj_path.lower().endswith(".obj"):
            raise ValueError("OBJ mesh must be a .obj file")

        self.obj_path = obj_path

        if mtl_path is not None and not mtl_path.endswith(".mtl"):
            raise ValueError("OBJ material must be a .mtl file")

        self.mtl_path = mtl_path

    def _to_dict_extra(self):
        return {
            "obj_path": self.obj_path,
            "mtl_path": self.mtl_path,
        }


class FBXMesh(Mesh):
    def __init__(self, name: str, fbx_path: str, **kwargs):
        super().__init__(name=name, **kwargs)

        if not (fbx_path.lower().endswith(".fbx")):
            raise ValueError("FBX mesh must be a .fbx file")

        self.gltf_path = fbx_path

    def _to_dict_extra(self):
        return {"fbx_path": self.gltf_path}


class GLTFMesh(Mesh):
    def __init__(self, name: str, gltf_path: str, **kwargs):
        super().__init__(name=name, **kwargs)

        if not (
            gltf_path.lower().endswith(".gltf")
            or gltf_path.lower().endswith(".glb")
        ):
            raise ValueError("gLTF mesh must be a .gltf or .glb file")

        self.gltf_path = gltf_path

    def _to_dict_extra(self):
        return {"gltf_path": self.gltf_path}


class PlyMesh(Mesh):
    def __init__(self, name: str, ply_path: str, **kwargs):
        super().__init__(name=name, **kwargs)

        if not ply_path.lower().endswith(".ply"):
            raise ValueError("PLY mesh must be a .ply file")

        self.ply_path = ply_path

    def _to_dict_extra(self):
        return {"ply_path": self.ply_path}


class StlMesh(Mesh):
    def __init__(self, name: str, stl_path: str, **kwargs):
        super().__init__(name=name, **kwargs)

        if not stl_path.lower().endswith(".stl"):
            raise ValueError("STL mesh must be a .stl file")

        self.stl_path = stl_path

    def _to_dict_extra(self):
        return {"stl_path": self.stl_path}
