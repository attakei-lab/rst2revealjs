from docutils.core import publish_string

from rst2revealjs.reader import RevealjsReader
from rst2revealjs.writer import RevealjsWriter

reader = RevealjsReader()
writer = RevealjsWriter()


def publish_revealjs(source):
    try:
        output = publish_string(
            source,
            reader=reader,
            writer=writer,
        ).decode()
        return output
    except Exception:
        pass
